<template>
    <span class="badge bg-secondary ms-2 fs-5" v-if="filterItem">{{filterItem.name}}: {{filterItem.value}}</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
})
export default class extends Vue {
    @Prop() public filterItem: any;
}
</script>
