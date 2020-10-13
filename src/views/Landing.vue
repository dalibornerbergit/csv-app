<template>
  <div class="container text-light py-4">
    <div v-if="error">
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Došlo je do greške
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <a class="text-white" href="/">Osvježi</a>
    </div>

    <div class="row d-flex justify-content-center mb-5">
      <div class="col-lg-5">
        <div class="card text-white bg-dark mt-5">
          <div class="card-header d-flex justify-content-center">
            <img src="/csv.png" width="100" height="100" alt="Img not found" />
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-3">Odaberite datoteku</h6>

            <input
              @change="onFileChange"
              type="file"
              name="file"
              accept=".csv"
            />
            <div class="d-flex justify-content-between mt-3">
              <button v-if="file" @click="loadFile" class="btn btn-warning">
                Učitaj podatke
              </button>
              <button
                v-if="contacts.length > 0"
                @click="storeFile"
                class="btn btn-success"
              >
                Spremi podatke
              </button>
            </div>
            <div
              v-if="contacts.length > 0 || badInputs.length > 0"
              class="mt-4"
            >
              <a href="/" class="text-white">Očisti zapise</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="success">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Podaci spremljeni
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <a class="text-white" href="/contacts">Pregled podataka</a>
    </div>

    <div v-if="contacts.length > 0">
      <hr class="bg-light" />

      <p>Podaci koji će biti spremljeni.</p>
      <div>
        <span
          >Broj zapisa koji će biti spremljeni:
          <b class="text-success">{{ contacts.length }}</b></span
        >
      </div>
      <table class="table table-dark my-4">
        <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Poštanski broj</th>
            <th scope="col">Grad</th>
            <th scope="col">Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in contacts" :key="data.id">
            <td>{{ data[0] }}</td>
            <td>{{ data[1] }}</td>
            <td>{{ data[2] }}</td>
            <td>{{ data[3] }}</td>
            <td>{{ data[4] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="badInputs.length > 0">
      <hr class="bg-danger" />

      <p class="text-left">
        Podaci koji <span class="text-danger">neće</span> biti spremljeni
        (duplikati ili nevaljali unosi).
      </p>
      <p class="text-left">
        Polja označena <span class="text-danger">crvenom</span> bojom imaju
        grešku.
      </p>
      <table class="table table-dark my-4">
        <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Poštanski broj</th>
            <th scope="col">Grad</th>
            <th scope="col">Telefon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in badInputs" :key="data.id">
            <td v-if="data[0].match(/[0-9]/)" class="text-danger">
              {{ data[0] }}
            </td>
            <td v-else>{{ data[0] }}</td>

            <td v-if="data[1].match(/[0-9]/)" class="text-danger">
              {{ data[1] }}
            </td>
            <td v-else>{{ data[1] }}</td>

            <td v-if="!data[2].match(/^\d+$/)" class="text-danger">
              {{ data[2] }}
            </td>
            <td v-else>{{ data[2] }}</td>

            <td v-if="data[3].match(/[0-9]/)" class="text-danger">
              {{ data[3] }}
            </td>
            <td v-else>{{ data[3] }}</td>

            <td v-if="data[4].match(/[a-zA-Z]/)" class="text-danger">
              {{ data[4] }}
            </td>
            <td v-else>{{ data[4] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    success: false,
    error: false,
    file: null,
    contacts: [],
    badInputs: [],
  }),
  created() {
    if (this.$route.query.error) {
      this.error = true;
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.file = file;
    },
    loadFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("http://127.0.0.1:8000/api/load", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.contacts = response.data.data;
          this.badInputs = response.data.bad_inputs;
        })
        .catch((error) => {
          console.log(error);

          window.location.href = "/?error=true";
        });
    },
    storeFile() {
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("http://127.0.0.1:8000/api/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);

          this.success = true;
        })
        .catch((error) => {
          console.log(error);

          window.location.href = "/?error=true";
        });
    },
  },
};
</script>

<style>
</style>