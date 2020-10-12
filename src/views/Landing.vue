<template>
  <div>
    <h1>CSV</h1>
    <input
      required
      @change="onFileChange"
      type="file"
      name="file"
      accept=".csv"
    />
    <div>
      <!-- <button class="btn btn-warning" type="submit">Učitaj podatke</button> -->
      <button @click="saveFile" class="btn btn-success">Spremi podatke</button>
    </div>

    <div>
      {{ contacts }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    file: null,
    contacts: "",
  }),
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      console.log(file);
      this.file = file;
    },
    saveFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("http://127.0.0.1:8000/api/load", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(typeof response.data.data);

          this.contacts = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>