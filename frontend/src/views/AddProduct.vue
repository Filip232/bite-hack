<template>
    <div class="wrapper-add-product">
        <CvToastNotification
            :class="[
                $styleUtils['notification'],
                {
                    [$styleUtils['notification--opened']]: serverError,
                    [$styleUtils['notification--closed']]: !serverError
                },
            ]"
            kind="error"
            title="Error"
            :caption="serverError"
            @close="serverError = null"
        />
        <CvLoading :active="isLoading" :overlay="true" />
        <h1>Add Product</h1>
        <CvForm @submit.prevent="addProduct">
            <CvTextInput :class="$styleUtils['mt-4']" label="Product name" v-model="form.name" />
            <CvTextArea :class="$styleUtils['mt-4']" label="Description" v-model="form.description" />
            <CvTextInput :class="$styleUtils['mt-4']" label="Location" v-model="form.location" />
            <CvSelect :class="$styleUtils['mt-4']" label="Category" v-model="form.category">
                <template v-for="(category, index) in categories">
                    <CvSelectOption :key="index" :value="category" >{{ category }}</CvSelectOption>
                </template>
            </CvSelect>
            <CvButton :class="$styleUtils['mt-6']">Add product</CvButton>
        </CvForm>
    </div>
</template>
<script>
import axios from 'axios';
import { CvForm, CvButton, CvTextInput, CvToastNotification, CvSelect, CvSelectOption, CvTextArea } from '@carbon/vue/src';


export default {
    name: 'AddProduct',
    components: {
        CvForm,
        CvTextInput,
        CvButton,
        CvToastNotification,
        CvSelect,
        CvSelectOption,
        CvTextArea,
    },
    data() {
        return {
            serverError: null,
            isLoading: false,
            categories: [],
            form: {
                name: '',
                description: '',
                location: '',
                category: 'Elektronika'
            },
        };
    },
    async created() {
        this.isLoading = true;
        const { data } = await axios.get('products/data/categories').catch(() => this.isLoading = false);
        this.categories = data.categories;
        this.isLoading = false;
    },
    methods: {
        async addProduct() {
            this.serverError = null;
            this.isLoading = true;
            await axios.post('/products/add', {
                ownerId: this.$store.state.user.id,
                description: this.form.description,
                productName: this.form.name,
                location: this.form.location,
                token: this.$store.state.user.token,
                category: this.form.category,
            }).catch(err => {
                this.serverError = err.response.data.msg
                this.isLoading = false;
            });
            if(this.serverError) return;
            
            this.isLoading = false;
            this.$router.push(`/products/my/${this.$store.state.user.id}`);
        },
    }
}
</script>

<style lang="scss" scoped>
.wrapper-add-product {
    padding-top: 13vh;
    width: 70%;
    margin: 0 auto;
}
</style>

<style lang="scss" src="@/assets/utils.module.scss" module="$styleUtils"></style>
