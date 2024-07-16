<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    name: String,
    value: String,
    label: String,
    type: String,
    placeholder: String,
    maxlength: String,
    minlength: String,
    max: String,
    min: String,
    size: String,
    autocomplete: String,
    hint: String,
    customError: String,
    pattern: String,
    step: String,
    disabled: Boolean,
    autofocus: Boolean,
    required: Boolean,
    readonly: Boolean,
    staticError: Boolean,
    modelValue: String,
})

const emit = defineEmits(["update:modelValue"]);

const textValue = ref(props.modelValue);

emit("update:modelValue", textValue);

</script>


<template>
    <awc-input v-model="textValue" :name="props.name" :label="props.label" :type="props.type"
        :placeholder="props.placeholder" :maxlength="props.maxlength" :minlength="props.minlength" :max="props.max"
        :min="props.min" :step="props.step" :size="props.size" :disabled="props.disabled" :required="props.required"
        :readonly="props.readonly" :hint="props.hint" :autocomplete="props.autocomplete" :autofocus="props.autofocus"
        :pattern="props.pattern" :customError="props.customError" :staticError="props.staticError">
    </awc-input>
</template>


<style scoped>
.app-input {
    padding: 16px 14px;
    height: 50px;
    width: 100%;
    border-radius: var(--corner-radius-10);
    border: 1px solid var(--color-gray-10);
}
</style>