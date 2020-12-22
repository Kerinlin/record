<template>
  <div class="home">
    <button @click="startRecord">开始录制</button>
    <button @click="endRecord">结束录制</button>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: "home",
  data() {
    return {
      instance: null
    };
  },
  methods: {
    startRecord() {
      ipcRenderer.send("startRecord");
    },
    endRecord() {
      ipcRenderer.send("stopRecord");
    }
  }
};
</script>
