import { Label } from '@/core/components/ui/label.tsx';
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { FormField } from '@/core/interfaces/resource/form-field.interface.tsx';
import { Editor } from '@/core/components/editor/editor-00/editor.tsx';
import { useEffect, useState } from 'react';
import { $getRoot, LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $isImageNode } from '@/core/components/editor/editor/nodes/image-node.tsx';
import { $isVideoNode } from '@/core/components/editor/editor/nodes/video-node.tsx';
import { useTranslation } from 'react-i18next';
import { $isAudioNode } from '../editor/editor/nodes/audio-node';
import { $isVariableNode } from '../editor/editor/nodes/variable-node';
import {
  ACTIVE_LANGUAGE_FIELD,
  normalizeTranslationsToMap,
  TRANSLATION_ORIGINAL_KEY,
} from '@/lib/utils';
import {
  EMAIL_CATEGORY_ALLOWED_VARIABLES,
  EmailTemplateCategory,
} from '../editor/editor/constants/email-variables';

export const FormWysiwygInput = <TEdit extends FieldValues>({
  field,
  setValue,
  htmlContent,
  plugins,
}: {
  field: FormField;
  setValue: UseFormSetValue<TEdit>;
  htmlContent?: string;
  plugins?: string[];
}) => {
  const { t } = useTranslation();
  const {
    getValues,
    setValue: setValueFromContext,
    control,
  } = useFormContext<TEdit>();

  const activeLanguage = useWatch({
    control,
    name: ACTIVE_LANGUAGE_FIELD as any,
  }) as string | undefined;

  const category = useWatch({
    control,
    name: 'category' as any,
  }) as string | undefined;

  const allowedVariables: string[] | undefined = category
    ? EMAIL_CATEGORY_ALLOWED_VARIABLES[
        category.toLowerCase() as EmailTemplateCategory
      ]
    : undefined;

  const isOriginal =
    !activeLanguage ||
    activeLanguage === TRANSLATION_ORIGINAL_KEY ||
    !field.translatable;

  const fieldName = (
    isOriginal ? field.name : `translations.${activeLanguage}.${field.name}`
  ) as Path<TEdit>;

  const [editorValue, setEditorValue] = useState<any>(null);
  const [mountKey, setMountKey] = useState(0);
  const [editorInstance, setEditor] = useState<LexicalEditor | null>(null);

  useEffect(() => {
    const currentValue = getValues(fieldName);
    setEditorValue(currentValue === undefined ? null : currentValue);
    setMountKey((prev) => prev + 1);
  }, [fieldName, getValues]);

  useEffect(() => {
    if (isOriginal || !activeLanguage) return;

    const currentTranslations = getValues('translations' as any);
    const normalized = normalizeTranslationsToMap(currentTranslations);

    if (!normalized[activeLanguage] || normalized[activeLanguage] === null) {
      setValueFromContext(`translations.${activeLanguage}` as any, {} as any, {
        shouldDirty: false,
      });
    }
  }, [activeLanguage, isOriginal, getValues, setValueFromContext]);

  const extractFileIds = (editor: any) => {
    const fileIds: string[] = [];
    const custom_variable: string[] = [];

    editor.update(() => {
      if (!editorInstance) return;
      setValue(
        htmlContent as Path<TEdit>,
        $generateHtmlFromNodes(editorInstance) as PathValue<TEdit, Path<TEdit>>
      );
      const traverse = (node: any) => {
        if (
          ($isImageNode(node) || $isVideoNode(node) || $isAudioNode(node)) &&
          node.__id
        ) {
          fileIds.push(node.__id);
        }
        if ($isVariableNode(node)) {
          if (node.getKind() === 'custom') {
            custom_variable.push(node.getValue());
          }
        }
        if (typeof node.getChildren === 'function') {
          for (const child of node.getChildren()) {
            traverse(child);
          }
        }
      };

      const root = $getRoot();
      for (const child of root.getChildren()) {
        traverse(child);
      }

      setValue(
        'fileIds' as Path<TEdit>,
        fileIds as PathValue<TEdit, Path<TEdit>>
      );

      setValue(
        'custom_variables' as Path<TEdit>,
        custom_variable as PathValue<TEdit, Path<TEdit>>
      );
    });
  };

  return (
    <div className={'space-y-2 flex-1'} key={String(fieldName)}>
      <Label className="w-min whitespace-nowrap relative">
        {t(field.label || '')}
        {field.required && (
          <span className="relative text-red-500 top-0 -right-[2px]">*</span>
        )}
      </Label>
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <div className="h-[400px] max-h-[400px]">
            <Editor
              key={`${String(fieldName)}-${mountKey}`}
              className="h-full"
              editorSerializedState={editorValue}
              onSerializedChange={(serialized) => {
                onChange(serialized);
                setEditorValue(serialized);
                extractFileIds(editorInstance);
              }}
              onEditor={(instance) => setEditor(instance)}
              plugins={plugins}
              allowedVariables={allowedVariables}
            />
          </div>
        )}
      />
      <p className={'text-sm text-muted-foreground'}>
        {t('pedagogy.form.writing-section.editor.warning')}
      </p>
    </div>
  );
};
