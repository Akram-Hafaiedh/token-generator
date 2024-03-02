<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
      <h1 class="mb-6 text-3xl font-bold">JWT Token Generator</h1>
      <form class="space-y-6">
        <div>
          <label class="block text-gray-700" for="input">
            Enter something to generate token
          </label>
          <input id="input" v-model="inputValue" type="text"
            class="block w-full px-4 py-3 mb-4 text-gray-700 bg-white border rounded-md shadow-sm" placeholder="text">
        </div>
        <div>
          <button type="button"
            class="block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
            @click="generateToken">
            Generate Token
          </button>
        </div>
        <p v-if="token" class="px-4 py-3 break-words bg-gray-200 rounded ">
          {{ token }}
        </p>
        <p v-else class="px-4 py-3 text-red-700 bg-red-100 border-red-400 rounded">No token generated</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const inputValue = ref('')
    const token = ref('')

    const generateToken = async () => {
      try {
        const response = await axios.post<{ token: string }>('http://localhost:8080/generate-token',
          { data: inputValue.value });
        console.log('Response:', response.data);
        token.value = response.data.token;
      } catch (error) {
        console.error('Error generating token:', error);
      }
    }

    return { inputValue, token, generateToken }
  }
})
</script>

<style></style>
