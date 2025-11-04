---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

YoPrint React Coding Project
Kita buat nama aplikasinya ini adalah YoPrintAnime. jadi Aplikasi ini adalah website pencarian anime gitu. Fiturnya adalah

Halaman Pencarian: Tempat pengguna bisa mencari anime.

Halaman Detail: Menampilkan detail anime yang dipilih dari hasil pencarian.

Fitur Utama yang Wajib Dibuat
Pencarian Instan (Instant Search): Hasil pencarian harus muncul saat pengguna mengetik, tanpa perlu menekan tombol "Enter".

Debouncing: Panggilan API saat pencarian harus diberi jeda (debounce) 250ms. Ini untuk mencegah API dipanggil di setiap ketukan tombol.

Pembatalan Request (Request Cancellation): Jika pengguna terus mengetik, request API yang sedang berjalan (in-flight) harus dibatalkan.

Pagination: Halaman pencarian harus memiliki navigasi halaman (page 1, 2, 3, dst.) yang dikelola di sisi server.

Singkatnya, ini adalah proyek mini untuk membuat "Aplikasi Pencarian Anime" menggunakan React.

Tujuan utamanya adalah untuk menguji kemampuan Anda dalam React, TypeScript, dan Redux.

Ringkasan Proyek
Anda diminta membuat aplikasi dua halaman:

Halaman Pencarian: Tempat pengguna bisa mencari anime.

Halaman Detail: Menampilkan detail anime yang dipilih dari hasil pencarian.

Proyek ini akan menggunakan Jikan API (API anime gratis tanpa perlu autentikasi).

Fitur Utama yang Wajib Dibuat
Pencarian Instan (Instant Search): Hasil pencarian harus muncul saat pengguna mengetik, tanpa perlu menekan tombol "Enter".

Debouncing: Panggilan API saat pencarian harus diberi jeda (debounce) 250ms. Ini untuk mencegah API dipanggil di setiap ketukan tombol.

Pembatalan Request (Request Cancellation): Jika pengguna terus mengetik, request API yang sedang berjalan (in-flight) harus dibatalkan.

Pagination: Halaman pencarian harus memiliki navigasi halaman (page 1, 2, 3, dst.) yang dikelola di sisi server.

Persyaratan Teknis (Stack)
React 18+ (hanya boleh pakai React Hooks, tidak boleh pakai class components).

TypeScript (penggunaan tipe data yang baik, hindari any).

Redux (wajib dipakai untuk state management).

react-router-dom (untuk navigasi antar halaman).
Aturan Pengumpulan (Sangat Penting!)
Ini adalah bagian paling kritis. Jika Anda gagal di bagian ini, proyek akan otomatis didiskualifikasi:

Hanya boleh pakai npm: Dilarang keras menggunakan yarn, pnpm, atau package manager lainnya.

Perintah Sederhana: Proyek harus bisa langsung dijalankan hanya dengan dua perintah:

npm install

npm run dev

Port 4000: Server pengembangan (dev server) wajib berjalan di port 4000.

Tanpa Environment Variables: Aplikasi harus bisa langsung dipakai tanpa perlu mengatur file .env.

Deployment: Proyek harus di-hosting secara online (misalnya di Netlify, Vercel, dll.) dan URL-nya harus disertakan saat pengumpulan.

Evaluasi
Anda akan dinilai berdasarkan:

Fungsionalitas: Apakah semua fitur berjalan sesuai deskripsi.

Kualitas Kode: Kode yang bersih, terstruktur rapi, dan mudah dikelola.

Penggunaan TypeScript: Seberapa baik Anda menerapkan tipe data.

Best Practice React & Redux: Penggunaan hooks yang benar, manajemen state yang efisien, dll.

Ada juga Poin Bonus jika Anda menambahkan fitur seperti skeleton loader (tampilan loading), desain yang responsif di HP, atau unit test.

English language ya
buat ui/ux nya juga yang modern, bagus, unik, dan lain lain, oya jangan buat comment yaa dalam codenya. buat comment kalau butuh aja, professional. english lang.