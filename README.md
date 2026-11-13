# 🎂 HBD Kaede - Underwater Floating Memories Website

An interactive birthday celebration website created with HTML, CSS, JavaScript, and Python backend, replicating the dreamy underwater vintage aesthetic from the photo (underwater teal ambience, "HBD Kaede" typography, ribbon decor, and twinkling starlight).

Photos **gently sink into the water and stay submerged, floating and bobbing with realistic buoyancy**, and clicking any photo opens an **album modal with multiple memories**!

---

## 🚀 1. How to Run (Python Backend)

Runs directly with Python's built-in standard library (no extra pip packages required):

```bash
# In the terminal, navigate to the To.Kaede directory and run:
python3 server.py
```

- Open your browser (Chrome, Safari, etc.) and visit **`http://localhost:8080`**!
- (Optional Flask version: `pip install flask` then `python3 app.py`)

---

## 📸 2. Adding Photos (Photo Slots are Ready!)

If you haven't added photos yet, **vintage pastel placeholders (Photo Slot #1, #2...)** will be displayed automatically without broken image errors.

### Step 1: Copy your photos
Put your image files inside the `static/images/memories/` folders:
```text
To.Kaede/
└── static/
    └── images/
        ├── bg.jpg                       <- Main background image
        └── memories/
            ├── group1/                  <- Memory Group 1
            │   ├── cover.jpg            <- Cover photo floating underwater
            │   ├── photo1.jpg           <- Photo 1 inside modal
            │   ├── photo2.jpg           <- Photo 2 inside modal
            │   └── ...
            ├── group2/
            ├── group3/
            └── ...
```

### Step 2: Set paths in `static/js/data.js`
Open `static/js/data.js` and fill in the empty quotes `""` with your photo paths:

```javascript
{
    id: 1,
    title: "Our First Journey ✈️",
    date: "Memory 01",
    description: "The gentle breeze and laughter that made that trip unforgettable.",
    // 1) Cover photo floating in the water
    coverImage: "static/images/memories/group1/cover.jpg",
    
    // 2) Multiple photos revealed inside the modal
    photos: [
        { src: "static/images/memories/group1/photo1.jpg", caption: "Heart fluttering right before takeoff 🎈" },
        { src: "static/images/memories/group1/photo2.jpg", caption: "A breathtaking view we stumbled upon 🌿" },
        { src: "static/images/memories/group1/photo3.jpg", caption: "Quiet talks watching the evening sunset 🌅" }
    ]
}
```

---

## 💌 3. Changing Names & Birthday Letter
In `static/js/data.js` under `BIRTHDAY_CONFIG`:
- `name`: Friend's name
- `title`: Main header title
- `letter.content`: Heartfelt birthday letter text

---

## ✨ 4. Key Interactive Features
1. **Underwater Sinking & Bobbing (물속 붕붕 떠다니는 효과)**:
   - Photos sink down into the water and stay submerged, gently bobbing up and down with realistic water buoyancy.
   - **Draggable**: You can click and drag the photos to reposition them anywhere in the water!
2. **Multiple Photos Modal**: Clicking any floating photo pops open a gallery card containing multiple memories.
3. **Fullscreen Lightbox**: Click any photo inside the modal to zoom in full size.
4. **Music Box BGM**: Click `🎵 BGM Play` on top to play a sweet music box Happy Birthday melody.
5. **Underwater Bubbles & Waves**: Use the bottom buttons (`Release Bubbles 🫧`, `Drift Waves 🌊`) to create lively water currents.
