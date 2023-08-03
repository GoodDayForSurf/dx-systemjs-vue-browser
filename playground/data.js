// "compositionApi" from ../index.test.js
var compositionApiVar = `
<template>
    <div class="my-class">
        <template>
            Content and { text }
        </template>
    </div>
</template>
<script setup>
 const text = ref('my-text');
</script>`;