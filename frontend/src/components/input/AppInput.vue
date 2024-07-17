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
    size: {
        type: String,
        default: "medium"
    },
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

const imageUrl = ref<string | null>(null);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

</script>

<template>
    <div v-if="props.type === 'photo'" class="upload-container">
        <label for="file-upload" class="file-upload-label">
            <input type="file" id="file-upload" accept="image/*" @change="handleFileUpload" />
            <div v-if="imageUrl" class="image-preview">
                <img :src="imageUrl" alt="Предварительный просмотр" />
            </div>
            <div v-else class="placeholder">
                <awc-icon type="icon" size="24" name="photo"></awc-icon>
            </div>
        </label>
    </div>
    <awc-input v-else v-model="textValue" :name="props.name" :label="props.label" :type="props.type"
        :placeholder="props.placeholder" :maxlength="props.maxlength" :minlength="props.minlength" :max="props.max"
        :min="props.min" :step="props.step" :size="props.size" :disabled="props.disabled" :required="props.required"
        :readonly="props.readonly" :hint="props.hint" :autocomplete="props.autocomplete" :autofocus="props.autofocus"
        :pattern="props.pattern" :customError="props.customError" :staticError="props.staticError">
    </awc-input>
</template>


<style scoped>
awc-input {
    width: 100%;
}

awc-input[type="search"] {
    --medium: auto;
}

.upload-container {
    position: relative;
    width: 100px;
    height: 100px;
}

.file-upload-label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background-color: #f4f4f4;
}

.file-upload-label input[type="file"] {
    display: none;
}

.image-preview {
    width: 100%;
    height: 100%;
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.placeholder img {
    width: 50%;
    height: 50%;
    object-fit: contain;
    opacity: 0.5;
}
</style>
