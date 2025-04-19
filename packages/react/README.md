# simplify-slider

https://github.com/SeoJaeWan/simplify-slider

![Branches](https://seojaewan.github.io/simplify-slider/react/badge-branches.svg)

## 📖 About

simplify-slider is a library designed to help you build simple and intuitive sliders effortlessly.
Initially built for React, it is being extended to support plain JavaScript as well.

The library is continuously being improved to ensure easy integration across a wide range of projects.

## 🛠️ Install

```bash
npm install @simplify-slider/react
# or
yarn add @simplify-slider/react
```

## ✨ Simple Usage

simplify-slider allows you to easily build a slider layout using the SimplifySlider and SimplifySlide components.
Check out the examples below to learn how to use the library and configure various options.

#### ✅ Default

```
<SimplifySlider>
  <SimplifySlide>
    <div>1</div>
  </SimplifySlide>

  <SimplifySlide>
    <div>2</div>
  </SimplifySlide>

  <SimplifySlide>
    <div>3</div>
  </SimplifySlide>

  <SimplifySlide>
    <div>4</div>
  </SimplifySlide>
</SimplifySlider>
```

Wrap multiple SimplifySlide components inside a SimplifySlider to render a basic slider.

---

#### Ref : Core

```
coreRef.current?.next();            // Move to the next slide
coreRef.current?.prev();            // Move to the previous slide
coreRef.current?.goTo(1);           // Go to the specified slide index
coreRef.current?.getCurrentIndex(); // Get the current active slide index
coreRef.current?.getOptions();      // Get the initialized slider options

<SimplifySlider
  ref={coreRef}
>
  {/* ... */}
</SimplifySlider>
```

You can control the slider instance or retrieve its state using ref.
Available methods:

| Method              | Description                            |
| ------------------- | -------------------------------------- |
| `next()`            | Moves to the next slide                |
| `prev()`            | Moves to the previous slide            |
| `goTo(index)`       | Navigates to the specified slide index |
| `getCurrentIndex()` | Returns the current active slide index |
| `getOptions()`      | Returns the initialized slider options |

---

#### 📏 Space Between : number

```
<SimplifySlider
  options={{
    spaceBetween: 20,
  }}
>
  {/* ... */}
</SimplifySlider>
```

Sets the space between slides. The value is in pixels. Default is 0.

---

#### 📦 Slides Per View : number

```
<SimplifySlider
    options={{
        slidesPerView: 4,
    }}
>
  {/* ... */}
</SimplifySlider>
```

Specifies how many slides should be visible at once. Default is 1.

---

#### 🔁 Loop : boolean

```
<SimplifySlider
    options={{
        loop: true,
    }}
>
  {/* ... */}
</SimplifySlider>
```

Enables infinite looping — after the last slide, it goes back to the first. Default is false.

---

#### ✋ Drag [boolean]

```
<SimplifySlider
    options={{
        drag: true,
    }}
>
  {/* ... */}
</SimplifySlider>
```

Allows users to swipe or drag to navigate between slides. Default is false.

---

### ⏱ Autoplay

If you want slides to move automatically, use the autoplay option.

#### ⏲️ interval : number

```
<SimplifySlider
    options={{
        autoplay: {
            interval: 1000
        }
    }}
>
  {/* ... */}
</SimplifySlider>
```

Sets the time interval (in milliseconds) between automatic slide transitions. Default is 3000 (3 seconds).

---

#### ↔️ direction : "left" | "right"

```
<SimplifySlider
    options={{
        autoplay: {
            direction: "left"
        }
    }}
>
  {/* ... */}
</SimplifySlider>
```

Sets the direction of the autoplay transition. Default is "right".

---

#### 🔄 rolling : boolean

```
<SimplifySlider
    options={{
        autoplay: {
            rolling: true
        }
    }}
>
  {/* ... */}
</SimplifySlider>
```

Enables smooth rolling-like transition between slides. Default is false.

---

#### 📊 onProgress : (progress: number) => void

```
<SimplifySlider
    options={{
        autoplay: {
            onProgress: (progress) => { console.log(progress) }
        }
    }}
>
  {/* ... */}
</SimplifySlider>
```

A callback function that receives the slide transition progress in real-time (value between 0 and 1).
Useful for custom progress bars or indicators.

---

### 🪝 useSimplifySlide

This custom hook provides convenient utility functions to control the slider, while safely managing access to the Core instance.
If the slider is not yet initialized, calling methods will throw a UninitializedCoreError to prevent unexpected behavior.

```
const {
  core,
  next,
  prev,
  goTo,
  getCurrentIndex,
  getOptions,
} = useSimplifySlide();

return (
  <>
    <SimplifySlider ref={core}>
      <SimplifySlide><div>1</div></SimplifySlide>
      <SimplifySlide><div>2</div></SimplifySlide>
      <SimplifySlide><div>3</div></SimplifySlide>
    </SimplifySlider>

    <button onClick={prev}>Prev</button>
    <button onClick={next}>Next</button>
  </>
);
```

| Method              | Description                                |
| ------------------- | ------------------------------------------ |
| `next()`            | Moves to the next slide                    |
| `prev()`            | Moves to the previous slide                |
| `goTo(index)`       | Navigates to the specified slide index     |
| `getCurrentIndex()` | Returns the current active slide index     |
| `getOptions()`      | Returns the initialized slider options     |
| `core`              | The ref object to pass into SimplifySlider |
