# Product Requirements Document
## The Memory Garden

### 1. Overview

**The Memory Garden** is a shared, evolving garden where personal memories become sketched flowers, each tied to a song. Exploring the garden feels like walking deeper into soft, colorful memory; interacting with it stays clear through precise Liquid Glass UI.

**Product promise:** Share a song, write a memory, plant a flower. Browse anonymous blooms planted by others.

### 2. Goals

- Make grief- and loss-related remembering feel gentle, visual, and shared without exposing identity.
- Keep the garden visually rich (color + sketch flowers) while UI stays minimal and uncluttered.
- Use progressive blur so “going deeper” is felt in the background, not in busy chrome.
- Support a simple plant flow with clear progress, back navigation that keeps input, and honest loading / error / success feedback.

### 3. Non-goals

- User accounts, profiles, or public usernames on posts.
- Social feeds, likes, comments, or DMs.
- Real-time multiplayer garden editing (shared garden can stay client/demo-backed for now).

### 4. Users and primary jobs

| Persona | Job |
|--------|-----|
| **Planter** | Attach a feeling to a song, write a short memory, bloom a flower, plant it in the garden. |
| **Wanderer** | Explore the field, open anonymous flower details, optionally start planting. |

### 5. Visual system (constraints)

**Garden canvas**

- Landing: vibrant painted flower-field atmosphere; keep richness, avoid clutter.
- Shared garden: natural grass / sky field; only planted sketch flowers appear on the field. No obvious platform shape or hard planting frame; placement bounds stay invisible.
- All memory flowers: sketch / hand-painted look (loose line, brush feel), distinct from sharp UI.

**Progressive blur**

- Landing: nearly clear.
- Garden: light softening.
- Wander / deeper explore: stronger blur.
- Modals open: deep wash behind Liquid Glass panels.

**Liquid Glass UI**

- Menus, buttons, counters, popups, lists, inputs, and detail panels use Liquid Glass: transparency, soft refraction, edge light, readable type, depth.
- Primary planting CTA may stay high-contrast (ink) if needed for accessibility; secondary actions stay glass.

**Motion**

- Intentional, calm motion (sway, bloom-in, fade-up).
- Respect `prefers-reduced-motion`.

### 6. Information architecture

**Screens**

1. **Landing** — brand, quote, Plant / Explore
2. **Garden hub** — field of memory flowers, live count, plant / wander controls
3. **Plant flow (modal)** — Song → Memory → Sprout → Plant
4. **Flower detail (modal)** — song + message + date; then optional next-step suggestions
5. **Ambient audio dock** — mute/play, volume, track credit

**Data principles**

- Posts are **anonymous** (no username / avatar in the detail footer; date + flower is enough).
- Songs are chosen from a mood-tagged catalog (grief / loss moods), searchable, about 20 songs per mood.

### 7. User journeys

#### A. Landing

- Show title **The Memory Garden**.
- Quote in glass: *“A memory becomes lighter when it is shared.”*
- Actions: **Plant a memory**, **Explore**.
- Background: vibrant field; blur minimal.

#### B. Garden hub

- Soft grass field + sketched memory flowers only.
- Glass **live memory count**.
- Back to landing (**Garden gate**).
- **Wander deeper** / **Plant a memory** (hide these while plant flow is open).
- No “Next memory” shortcut.
- Optional success toast after planting; no sticky minimal-preview card after plant.

#### C. Plant flow (Planter)

| Step | Name | Behavior |
|------|------|----------|
| 1 | **Song** | Search + list in glass. **Mood** panel filters catalog (Longing, Remembrance, Comfort, Farewell, Solitude, All). Deepen background blur. |
| 2 | **Memory** | Glass textarea with helpful grey placeholder. Change song (back). Create flower. Optional typing example. |
| 3 | **Sprout** | Show **sprout** (not a full bloom). Single primary **Bloom** (centered). Back keeps prior input. |
| 4 | **Plant** | Full sketched bloom. Try another bloom. Plant in the garden. |

**Cross-cutting plant UX**

- Always show step progress.
- Always show Back without clearing song/message.
- Clear loading, error, and success states.
- Readable contrast on glass.

#### D. Wanderer

- Explore garden; blur increases when wandering.
- Tap flower → detail modal: song, message, date (no identity).
- After detail: glass suggestions (explore similar / start planting).

#### E. Ambient music

- Bottom-right dock: play/mute, volume, info.
- Credit per artist request, e.g. Chillpeach — *In Dreamland* + YouTube link.
- No autoplay with sound until user gesture.

### 8. Functional requirements

- FR1: User can plant a memory (song + text + flower variant) into the garden field.
- FR2: User can filter songs by grief/loss mood and search by title/artist.
- FR3: Pre-bloom step shows a sprout; bloom reveals a full flower.
- FR4: Flower detail never exposes identity metadata.
- FR5: Progressive blur tracks landing → garden → wander → modal.
- FR6: Plant flow preserves form state on back.
- FR7: Background music is controllable and credited.

### 9. Content / data

- Song catalog CSV (mood, title, artist, id, tint), about 100 tracks, max about 20 per mood.
- Sample garden memories for first visit (anonymous presentation).
- Sketch flower assets (bloom variants + sprout).

### 10. Success metrics (lightweight)

- Plant flow completion rate (start → plant).
- Percent of plant sessions that use a mood filter.
- Explore → open detail rate.
- Music unmute rate (engagement, not vanity).

### 11. Open decisions / next iterations

- Persist garden server-side vs local-only demo.
- Whether Landing CTAs are all glass vs ink primary.
- Whether Mood panel shows short mood hints in UI.
- Org GitHub hosting vs personal clean fork for distribution.

### Appendix: Changes from the original concept brief

- Garden observe is grass + planted sketches, not a dense painted flower wallpaper as the interactive field.
- Posts are anonymous (no pseudonym UI).
- Pre-bloom is a sprout; bloom step is simplified.
- Song pick is mood-driven for grief/loss.
- Added progress, back-preserving input, feedback, and credited ambient audio.
- Removed Next memory and post-plant minimal preview.
