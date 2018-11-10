<template>
    <div class="inputContainer">
        <label 
            :id="labelId" 
            :for="name"
            :class="{
                label: true,
                label_shown: value.length > 0 || isLabelShown,
            }"
            @click="focusInput"
        >
            {{ labelText }}
        </label>
        
        <input v-if="!isTextarea" 
            v-model="value"
            ref="input"
            v-on="listeners"
            v-bind="$attrs"
            :id="id" 
            :name="name"
            :placeholder="isLabelShown ? placeholder : labelText"
            :class="{
                input: true,
                input_filled: value.length > 0,
            }"
            @focus="showLabel"
            @blur="hideLabel"
        />
        <textarea v-else
            v-bind="$attrs"
            v-model="value"
            v-on="listeners"
            :id="id" :name="name"
            :placeholder="isLabelShown ? placeholder : labelText"
            ref="input"
            class="input"
            @focus="showLabel"
            @blur="hideLabel"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: "BaseInput",
    inheritAttrs: false,
    data: () => ({
        value: '',
        isLabelShown: false,
    }),
    props: {
        type: {
            type: String,
            required: false,
            default: 'text',
        },
        isTextarea: {
            type: Boolean,
            required: false,
            default: false,
        },
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        labelText: {
            type: String,
            required: true,
        },
    },
    computed: {
        labelId() {
            return `${this.id}-label`
        },

        listeners() {
            return {
                ...this.$listeners,
                input: event =>
                    this.$emit('input', event.target.value),
            }
        }
    },
    methods: {
        focusInput() {
            this.$refs.input.focus()
        },
        showLabel() {
            this.isLabelShown = true
        },
        hideLabel() {
            this.isLabelShown = false
        },
    },
}
</script>

<style scoped>
.inputContainer {
    --grey: #b8b8b8;
    --pink: deeppink;
    margin-bottom: 2em;
    position: relative;
    display: flex;
    flex-flow: column;
    font-size: 18px;
    padding-bottom: 1px;
}

.input {
    margin-top: 1em;
    padding-bottom: 7px;
    border: 0;
    border-bottom: 2px solid var(--grey);
    transition-duration: 200ms;
}

.input_filled, .input:focus {
    border-bottom-color: var(--pink);
}

.input:focus {
    outline: 0;
}

.label {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition-duration: 250ms;
    transition-timing-function: cubic-bezier(.2, 0, .4, 1);
    transition-property: opacity, transform;
    will-change: opacity, trnasform;
    transform: scale(.9);
}

.label_shown {
    opacity: 1;
    transform: scale(1) translateY(-1em);
}

::-moz-placeholder {
    color: var(--grey);
    transition-duration: 250ms
}

::-webkit-input-placeholder {
    color: var(--grey);
    transition-duration: 250ms
}
</style>
