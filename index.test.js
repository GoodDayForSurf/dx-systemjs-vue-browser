require("./index.js");
ts = require("typescript");
vueCompilerSFC = require("@vue/compiler-sfc");

const template = `
<template>
    <div class="my-class">
        <template>
            Content and { text }
        </template>
    </div>
</template>
<script>
let someObj = { name: {} };
export default {
  data() {
    return {
      text: "my-text",
    };
  }
};
</script>`;

const compositionApi = `
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

const templateWithAdditionalProperties = `
<template>
    <div class="my-class">
    </div>
</template>
<script>
export default {
  filters: {
    custom: []
  },
  data() {
    return {
      text: "my-text",
    };
  }
};
</script>`;

const componentSource = `${template}
<style>
.my-class {
    color: red;
}
</style>`;

beforeEach(() => {
    document.head.textContent = "";
});


it("process template", async () => {
    const etalon = `
let someObj = { name: {} };
export default {
  template:  \`
    <div class=\"my-class\">
        <template>
            Content and { text }
        </template>
    </div>
\`,data() {
    return {
      text: \"my-text\",
    };
  }
};
`;
    const result = await translateSFC(componentSource);
    expect(result).toBe(etalon);
});
it("process template without styles", async () => {
    const etalon = `
let someObj = { name: {} };
export default {
  template:  \`
    <div class=\"my-class\">
        <template>
            Content and { text }
        </template>
    </div>
\`,data() {
    return {
      text: \"my-text\",
    };
  }
};
`;
    const result = await translateSFC(template);

    expect(result).toBe(etalon);
});

it("process styles", async () => {
    translateSFC(componentSource)
    expect(document.head.children[0].outerHTML).toEqual('<style type="text/css">.my-class { color: red;}</style>');
});

it("process with standalone styles", async () => {
    const componentWithStandaloneStyles = `${template}
    <style scoped anothershit src="./styles.css"></style>`;

    await translateSFC(componentWithStandaloneStyles);
    expect(document.head.children[0].outerHTML).toEqual('<link type="text/css" href="./styles.css" rel="stylesheet">');
});


it("process with additional properties", async () => {
  const etalon = `
export default {
  template:  \`
    <div class=\"my-class\">
    </div>
\`,filters: {
    custom: []
  },
  data() {
    return {
      text: \"my-text\",
    };
  }
};
`;
  const result = await translateSFC(template);

  expect(result).toBe(result);
});

it("process composition API", async () => {
    const etalon = `"use strict";\nvar __assign = (this && this.__assign) || function ()`;

    const result = await translateSFC(compositionApi);

    expect(result.startsWith(etalon)).toBe(true);
});
