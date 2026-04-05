# Amrut Nuli — Portfolio

## How to add your images

Your portfolio is fully set up. Images will show automatically once you
add your photos to the correct folders. All image folders are already
created for you. Just drop your files in and rename them as shown below.

---

## Folder structure for images

```
images/
│
├── profile/
│   └── photo.jpg                      ← Your profile photo (home page)
│
├── sae2022/                           ← SAE ADC 2022 (RC aircraft)
│   ├── 01-cad-model.jpg
│   ├── 02-manufactured.jpg
│   ├── 03-cfd.jpg
│   ├── 04-ansys.jpg
│   └── 05-flight.jpg
│
├── aerothon2022/                      ← SAE Aerothon 2022 (UAV)
│   ├── 01-uav-specs.jpg
│   ├── 02-payload-mech.jpg
│   ├── 03-ansys.jpg
│   └── 04-prototype.jpg
│
├── aerothon2023/                      ← SAE Aerothon 2023 (Tactical UAV)
│   ├── 01-cad-model.jpg
│   ├── 02-uav-specs.jpg
│   ├── 03-mission-profile.jpg
│   ├── 04-payload.jpg
│   ├── 05-cfd.jpg
│   └── 06-prototype.jpg
│
├── academic/
│   ├── axle/                          ← Transmission axle project
│   │   ├── 01-ansys.jpg
│   │   ├── 02-campbell-diagram.jpg
│   │   └── 03-bearing-calc.jpg
│   │
│   ├── cotton-robot/
│   │   ├── 01-prototype.jpg
│   │   ├── 02-cad-model.jpg
│   │   ├── 03-ansys.jpg
│   │   ├── 04-detection.jpg
│   │   └── 05-bom.jpg
│   │
│   ├── nerf/
│   │   ├── 01-exploded-view.jpg
│   │   ├── 02-2d-draft.jpg
│   │   ├── 03-cad-model.jpg
│   │   └── 04-render.jpg
│   │
│   ├── jig-fixture/
│   │   ├── 01-disassembly.jpg
│   │   ├── 02-2d-draft.jpg
│   │   └── 03-cad-model.jpg
│   │
│   └── cleaning-robot/
│       ├── 01-prototype.jpg
│       ├── 02-cad-model.jpg
│       └── 03-circuit.jpg
│
├── achievements/
│   ├── sae2022/
│   │   ├── 01-team.jpg
│   │   ├── 02-certificate.jpg
│   │   └── 03-aircraft.jpg
│   │
│   ├── addc2023/
│   │   ├── 01-team.jpg
│   │   ├── 02-certificate.jpg
│   │   └── 03-cad-model.jpg
│   │
│   └── aerothon2023/
│       ├── 01-team.jpg
│       ├── 02-prototype.jpg
│       └── 03-certificate.jpg
│
├── certifications/
│   ├── nx-essentials.jpg
│   ├── nx-advanced.jpg
│   ├── cswa.jpg
│   ├── cswa-am.jpg
│   ├── autocad.jpg
│   ├── gdt.jpg
│   ├── ansys-topo.jpg
│   ├── cfd-iit.jpg
│   ├── automotive-iit.jpg
│   ├── python.jpg
│   ├── aircraft-workshop.jpg
│   └── defence-workshop.jpg
│
└── research/
    └── presentation.jpg               ← Presentation photo / paper cover page
```

---

## Tips for images

- **Format:** JPG or PNG both work fine
- **Size:** Keep each image under 500 KB for fast loading. Use https://squoosh.app to compress.
- **Aspect ratio:** Landscape (wider than tall) works best for carousels — 16:9 or 4:3
- **Profile photo:** Square crop works best (it will be displayed as a circle)
- **If an image is missing:** The carousel will show a placeholder automatically — no errors

---

## Deploying to GitHub Pages

1. Upload ALL files (HTML, CSS, JS, and the entire images/ folder) to your GitHub repo
2. Go to Settings → Pages → Deploy from branch → main → / (root)
3. Your site will be live at https://yourusername.github.io

---

## One pending fix

In `certifications.html`, the **Siemens NX Advanced Design** credential link
is currently a placeholder (`#`). Log into Coursera, find the certificate,
copy the verification URL, and replace the `href="#"` with it.
