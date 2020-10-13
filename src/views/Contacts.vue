<template>
  <div class="container text-light py-4">
    <h3>Podaci</h3>

    <hr class="bg-light" />

    <p class="text-left">Podaci iz baze podataka</p>
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
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.ime }}</td>
          <td>{{ contact.prezime }}</td>
          <td>{{ contact.postanski_br }}</td>
          <td>{{ contact.grad }}</td>
          <td>{{ contact.telefon }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    contacts: [],
  }),
  created() {
    axios
      .get("http://127.0.0.1:8000/api/data")
      .then((response) => {
        console.log(response);

        this.contacts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>