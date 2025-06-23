<template>
    <v-dialog v-model="store.dialogOpen" :width="$vuetify.display.smAndDown ? '100%' : '90%'" scrollable persistent>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4" class="pa-0 pa-sm-4">
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        {{ `${store.title_form} ${store.section}` }}
                        <v-btn title="Cerrar" icon="mdi-close" color="primary" variant="text"
                            @click="store.dialogOpen = false"></v-btn>
                    </v-card-title>
                    <v-card-item>

                        <v-form v-model="valid">
                            <v-container class="pa-0 pa-sm-4 pb-2">
                                <div v-for="(field, index) in store.fields">

                                    <v-text-field v-if="field.type === 'text' || field.type === 'password' && !field.row"
                                        v-model="store.data[field.key]" :label="field.title" variant="underlined"
                                        :rules="[rules.required, rules.empty]" :key="index" :type="field.type"
                                        autocomplete="off">
                                    </v-text-field>

                                    <v-text-field v-if="field.type === 'number' && !field.row"
                                        v-model="store.data[field.key]" :label="field.title" variant="underlined"
                                        :rules="field.title === 'Tasa' ? [] : [rules.positive, rules.required]" min="1"
                                        :key="index" :type="field.type" autocomplete="off">
                                    </v-text-field>

                                    <v-select v-if="field.type === 'select' && !field.subKey"
                                        v-model="store.data[field.key]" :label="field.title" variant="underlined"
                                        :key="index" :rules="[rules.required]" :item-value="field.item_value"
                                        :item-title="field.item_title" :items="field.options">
                                    </v-select>

                                    <v-autocomplete v-if="field.type === 'autocomplete' && !field.subKey"
                                        v-model="store.data[field.key]" :label="field.title" variant="underlined"
                                        :key="index" :rules="[rules.required]" :items="field.options"
                                        autocomplete="off">
                                    </v-autocomplete>

                                    <v-checkbox v-if="field.type === 'check'" :label="field.title"
                                        v-model="store.data[field.key]">
                                    </v-checkbox>

                                    <div v-if="field.type === 'number' && field.row">
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field v-model="store.data[field.key]" :label="field.title"
                                                    variant="underlined" :rules="[rules.required, rules.positive]"
                                                    min="1" :key="index" :type="field.type" autocomplete="off"
                                                    :disabled="field.disabledKey">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="store.data[field.subKey]" :label="field.subTitle"
                                                    variant="underlined" :rules="[rules.required, rules.positive]"
                                                    min="1" :key="index" :type="field.subType" autocomplete="off"
                                                    :disabled="field.disabledSubKey">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </div>

                                    <div v-if="field.type === 'select' && !field.options && field.subKey">
                                        <v-row v-if="field.title != 'Correo'">
                                            <v-col cols="4" sm="3">
                                                <v-select v-model="store.data[field.key]" :label="field.title"
                                                    variant="underlined" :key="index"
                                                    :rules="field.key === 'iden' ? [rules.required, rules.empty] : []"
                                                    :items="constantes[field.constante]">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="store.data[field.subKey]" :label="field.subTitle"
                                                    variant="underlined" :key="index" :type="field.subType"
                                                    :rules="field.subKey === 'iden_number' ? [rules.required, rules.empty] : []"
                                                    autocomplete="off" min="1">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="field.title === 'Correo' && !field.options">
                                            <v-col>
                                                <v-text-field v-model="store.data[field.key]" :label="field.title"
                                                    variant="underlined" :key="index" :type="field.subType"
                                                    autocomplete="off">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-select v-model="store.data[field.subKey]" :label="field.subTitle"
                                                    variant="underlined" :key="index"
                                                    :items="constantes[field.constante]">
                                                </v-select>
                                            </v-col>

                                        </v-row>
                                    </div>
                                </div>
                            </v-container>
                            <v-btn v-if="store.title_form === 'Agregar'" color="primary" rounded
                                class="w-100 text-capitalize" @click="send_form" :loading="store.loading_button">{{
                                    store.title_form }}</v-btn>
                            <v-btn v-if="store.title_form === 'Modificar'" color="primary" rounded
                                class="w-100 text-capitalize" @click="send_modify" :loading="store.loading_button">{{
                                    store.title_form }}</v-btn>
                            <v-btn v-if="store.title_form === 'Modificar lote'" color="primary" rounded
                                class="w-100 text-capitalize" @click="send_modify_info"
                                :loading="store.loading_button">{{
                                    store.title_form }}</v-btn>
                        </v-form>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>

    </v-dialog>
</template>

<script setup>
import { constantes } from '@/utils/constantes';
import { rules } from '@/utils/rules';
const valid = ref(false)
const props = defineProps({
    store: { type: Object, required: true }
})

function send_form() {
    if (valid.value) {
        props.store.add()
    } else {
        props.store.alertaCrud('Error', true, ['No se pueden enviar datos vacíos'], 'error')
    }
    console.log(valid.value)
}

function send_modify() {
    if (valid.value) {
        props.store.modify()
    } else {
        props.store.alertaCrud('Error', true, ['No se pueden enviar datos vacíos'], 'error')
    }
}

function send_modify_info() {
    if (valid.value) {
        props.store.modify_info()
    } else {
        props.store.alertaCrud('Error', true, ['No se pueden enviar datos vacíos'], 'error')
    }
}



</script>