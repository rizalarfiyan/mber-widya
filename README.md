# Take-Home Assignment: PT. Widya Inovasi Indonesia

Halo!

Ini adalah proyek *take-home assignment* yang saya kerjakan untuk kesempatan bergabung dengan PT. Widya Inovasi Indonesia sebagai Intern Frontend atau Intern Fullstack Developer.

Dalam proyek ini, saya tidak hanya fokus menyelesaikan tugas, tetapi juga sangat memperhatikan kualitas kode dan bagaimana aplikasi ini bisa terus berkembang di masa depan. Karena itu, saya mengutamakan pendekatan **Type-Safe First** dengan TypeScript. Oh ya, proyek ini 95% hasil pemikiran dan kerja keras saya, dengan sedikit bantuan dari AI untuk mempercepat beberapa hal.

---

### Ingin Mencoba Aplikasinya?

Silakan masuk menggunakan salah satu dari dua peran yang sudah tersedia:

-   **Sebagai Admin**
    -   **Email:** `admin@widya.ai`
    -   **Password:** `password`
-   **Sebagai Guest**
    -   **Email:** `guest@widya.ai`
    -   **Password:** `password`

---

### Yuk, Coba Langsung! 🚀

Aplikasi dan dokumentasinya bisa diakses langsung melalui tautan berikut:

-   **Aplikasi Web:** [https://widya.rizalarfiyan.com/](https://widya.rizalarfiyan.com/)
-   **Endpoint API:** [https://api-widya.rizalarfiyan.com/](https://api-widya.rizalarfiyan.com/)
-   **Dokumentasi API (Swagger):** [https://api-widya.rizalarfiyan.com/swagger](https://api-widya.rizalarfiyan.com/swagger)

---

### Infrastruktur dan Proses Deployment

-   **Platform:** Aplikasi ini berjalan di atas server **DigitalOcean**, baik untuk sisi frontend maupun backend.
-   **Domain Kustom:** Agar mudah diakses, saya menggunakan domain kustom dari [rizalarfiyan.com](https://rizalarfiyan.com).
-   **Otomatisasi CI/CD:** Repositori ini sudah dilengkapi alur **CI/CD**. Jadi, setiap kali ada *update* kode, proses *build* dan *deployment* ke server akan berjalan otomatis. Praktis!

---

### Hal-hal Menarik di Dalam Proyek Ini ✨

Saya percaya kode terbaik adalah kode yang bisa "berbicara" sendiri. Silakan jelajahi repositori ini untuk melihat detailnya. Namun, sebagai gambaran, berikut beberapa hal yang saya perhatikan saat membangun proyek ini:

#### Sisi Backend

Saya membangun fondasi backend yang kuat, rapi, dan siap untuk jangka panjang.

-   **Struktur Kode yang Rapi (*Clean Architecture*):** Saya menerapkan pola `Router -> Controller -> Service -> Repository` agar alur logika backend jelas dan mudah ditelusuri.
-   **Sistem Autentikasi Modern:** Keamanan pengguna ditangani dengan **JWT (JSON Web Token)**, sebuah standar industri yang teruji.
-   **Dokumentasi API Interaktif:** Dengan **Swagger**, siapa pun dapat dengan mudah memahami dan mencoba setiap *endpoint* yang tersedia.
-   **Logging Terpusat:** Semua catatan aktivitas dan error tercatat rapi, mempermudah pelacakan jika terjadi masalah.
-   **Kualitas Kode Terjaga:** **Linter** dan aturan *code style* memastikan kode tetap konsisten, bahkan saat proyek berkembang.
-   **Penanganan Error yang Baik:** Aplikasi tidak akan *crash* begitu saja; setiap potensi error sudah diantisipasi dan ditangani dengan baik.
-   **Serba Type-Safe:** Berkat **TypeScript**, mayoritas error bisa terdeteksi lebih awal, bukan saat aplikasi sudah berjalan.
-   **Validasi & Keamanan:** Setiap data yang masuk akan divalidasi, dan *route* penting dilindungi oleh *middleware*.

#### Sisi Frontend

Antarmuka pengguna dibuat dengan pengalaman terbaik bagi pengguna dan developer sebagai prioritas.

-   **Kode yang Bersih dan Fleksibel:** Saya merancang komponen agar bisa digunakan kembali (*reusable*) dan mudah dipahami, mempercepat pengembangan fitur baru.
-   **Manajemen State yang Efisien:** Untuk mengelola data di sisi klien, saya memilih **Zustand** karena ringan, simpel, namun tetap *powerful*.
-   **Desain Responsif & Modern:** Tampilan aplikasi akan tetap optimal, baik diakses melalui laptop maupun ponsel.
-   **Tampilan Nyaman dengan Dark Mode:** Pengguna bisa memilih tema gelap untuk kenyamanan mata.
-   **Navigasi Anti-Salah (*Type-Safe Routing*):** Menggunakan **TanStack Router** untuk memastikan semua tautan dan navigasi di dalam aplikasi valid.
-   **UI Konsisten:** Dengan **Shadcn/UI**, komponen antarmuka terlihat seragam dan profesional.
-   **Pengalaman Pengguna yang Mulus:** Adanya **indikator loading** dan **penanganan error** yang jelas membuat pengguna selalu tahu apa yang sedang terjadi.