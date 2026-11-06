# PHOTO_SLOTS.md — tempat foto yang sudah disiapkan

Slot di bawah sudah ditulis di `content/*.ts`. **Belum ada berkas → slot tidak dirender**
(tidak ada bingkai kosong). Taruh berkas dengan nama persis seperti di tabel, lalu
`git push`. Foto muncul di build berikutnya **tanpa mengubah kode** (`lib/photos.ts`).

Ekstensi bebas: `.png`, `.jpg`, `.jpeg`, atau `.webp`.

- **`mock1`–`mock3`** = layar produk / mockup. Paling bagus PNG transparan seperti
  `ankop/mock1.png`. `mock1` juga jadi sampul kartu di `/projects`.
- **`dom1`–`dom3`** = foto proses kerja (lapangan, tim, booth, panggung).
- **`logo`** = logo persegi. Belum ada → kotak singkatan huruf (MAC, WTG, MUA, TER).

| Folder `public/images/…` | Berkas | Tampil di |
|---|---|---|
| `aei/` | `mock1`–`mock3` | `/projects/aei-project-control` + kartu `/projects` |
| `aei/` | `dom1`–`dom3` | `/experience/anugrah-energi-indonesia` |
| `macacih/` | `logo` | kartu & timeline |
| `macacih/` | `mock1`–`mock3` | `/projects/macacih` + kartu `/projects` |
| `macacih/` | `dom1`–`dom3` | `/experience/macacih` |
| `weigh-to-go/` | `logo`, `mock1`–`mock3`, `dom1`–`dom3` | `/projects/weigh-to-go` |
| `muara/` | `logo`, `mock1`–`mock3`, `dom1`–`dom3` | `/projects/muara` |
| `tera/` | `logo`, `mock1`–`mock3` | `/projects/tera` |
| `ifest/` | `dom1`–`dom3`, `certificate` | `/collabs/ifest-2026` |

Setelah foto masuk, perbarui `alt`-nya di `content/projects.ts` / `content/experience.ts`.
Saat ini teksnya masih umum ("product screen") karena isi fotonya belum diketahui. `alt`
juga dipakai sebagai caption di modal.
