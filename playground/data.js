// https://github.com/DevExpress/dx-systemjs-vue-browser/blob/master/index.test.js#L23
var compositionApiVar = `
<template>
    <div class="my-class">
        <template>
            Content and { text }
        </template>
    </div>
</template>
<script setup lang="ts">
import ref from "vue";
 const text = 'my-text';
</script>`;
