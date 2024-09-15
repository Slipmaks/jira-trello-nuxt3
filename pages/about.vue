<template>
  <div class="bg-teal-400 rounded-b-lg p-4 flex gap-4">
    <h2 class="text-lg text-slate-800">Links:</h2>
    <div class="pt-1 flex flex-col gap-1">
      <ULink
        target="_blank"
        to="https://www.linkedin.com/in/maksym-matsydulskas-170269147/"
        class="flex items-center text-blue-800 underline font-semibold gap-1"
      >
        <UIcon name="mdi:linkedin" /> Linkedin
      </ULink>
      <ULink
        target="_blank"
        to="https://github.com/Slipmaks"
        class="flex items-center text-slate-800 underline font-semibold gap-1"
      >
        <UIcon name="mdi:github-face" /> GitHub
      </ULink>
      <ULink
        target="_blank"
        to="https://slipmaks.github.io/resume/"
        class="flex items-center text-slate-800 underline font-semibold gap-1"
      >
        <UIcon name="mdi:folder-account-outline" /> Resume
      </ULink>
    </div>
  </div>
</template>
