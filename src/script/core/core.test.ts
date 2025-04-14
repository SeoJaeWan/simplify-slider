// import MoveScroll from ".";

// describe("moveScroll 테스트", () => {
//   let wrapper: HTMLOListElement;

//   const mockLength = 3;

//   beforeEach(() => {
//     wrapper = document.createElement("ol");

//     Object.defineProperty(wrapper, "offsetWidth", {
//       value: 1000,
//     });

//     for (let i = 0; i < mockLength; i++) {
//       const listItem = document.createElement("li");
//       wrapper.appendChild(listItem);
//     }

//     jest.useFakeTimers();

//     global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
//     global.cancelAnimationFrame = (id) => clearTimeout(id);
//   });

//   afterEach(() => {
//     jest.useRealTimers();

//     wrapper.remove();
//   });

//   it("MoveScroll 생성 시 clone 요소가 생성되고, transform이 첫 번째 슬라이드 위치를 나타낸다.", () => {
//     new MoveScroll(wrapper, mockLength);

//     const clonedElements = wrapper.querySelectorAll(".cloned");
//     expect(clonedElements.length).toBe(2);

//     expect(wrapper.style.transform).toBe("translateX(-1000px)");
//   });

//   it("next 메서드를 호출하면 index가 증가해야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);
//     moveScroll.next();

//     expect(moveScroll.getCurrentIndex()).toBe(2);
//   });

//   it("duration 시간 이전에 다시 호출해도 index는 증가하지 않아야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);

//     moveScroll.next();
//     expect(moveScroll.getCurrentIndex()).toBe(2);

//     moveScroll.next();
//     expect(moveScroll.getCurrentIndex()).toBe(2);
//   });

//   it("duration 시간 후에 다시 호출하면 index가 증가해야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);

//     moveScroll.next();
//     expect(moveScroll.getCurrentIndex()).toBe(2);

//     wrapper.dispatchEvent(new Event("transitionend"));

//     moveScroll.next();
//     expect(moveScroll.getCurrentIndex()).toBe(3);
//   });

//   it("loop 옵션이 없을 때 마지막 슬라이드에서 next를 호출하면 index는 유지되어야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength, {
//       loop: false,
//     });

//     for (let i = 0; i < mockLength; i++) {
//       moveScroll.next();
//       wrapper.dispatchEvent(new Event("transitionend"));
//     }

//     expect(moveScroll.getCurrentIndex()).toBe(3);
//   });

//   it("loop 옵션이 있을 때 마지막 슬라이드에서 next를 호출하면 첫 번째 슬라이드로 돌아가야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength, {
//       loop: true,
//     });
//     for (let i = 0; i < mockLength; i++) {
//       moveScroll.next();
//       wrapper.dispatchEvent(new Event("transitionend"));
//     }
//     expect(moveScroll.getCurrentIndex()).toBe(1);
//   });

//   it("prev 메서드를 호출하면 index가 감소해야 한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);

//     moveScroll.next();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     expect(moveScroll.getCurrentIndex()).toBe(2);

//     moveScroll.prev();
//     expect(moveScroll.getCurrentIndex()).toBe(1);
//   });

//   it("prev 메서드를 호출 시 초기값으로 설정된 duration 시간 전엔 다시 호출해도 감소하지 않는다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);

//     moveScroll.next();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     moveScroll.next();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     expect(moveScroll.getCurrentIndex()).toBe(3);

//     moveScroll.prev();
//     expect(moveScroll.getCurrentIndex()).toBe(2);

//     moveScroll.prev();
//     expect(moveScroll.getCurrentIndex()).toBe(2);
//   });

//   it("prev 메서드를 호출 시 초기값으로 설정된 duration 시간 후에 다시 호출하면 감소한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength);
//     moveScroll.next();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     moveScroll.next();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     expect(moveScroll.getCurrentIndex()).toBe(3);

//     moveScroll.prev();
//     expect(moveScroll.getCurrentIndex()).toBe(2);

//     wrapper.dispatchEvent(new Event("transitionend"));

//     moveScroll.prev();
//     expect(moveScroll.getCurrentIndex()).toBe(1);
//   });

//   it("loop 옵션이 없다면 prev 메서드를 첫 번째 슬라이드에서 호출 시 유지된다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength, {
//       loop: false,
//     });

//     expect(moveScroll.getCurrentIndex()).toBe(1);

//     moveScroll.prev();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     expect(moveScroll.getCurrentIndex()).toBe(1);
//   });

//   it("loop 옵션이 있다면 prev 메서드를 첫 번째 슬라이드에서 호출 시 마지막 슬라이드로 이동한다.", () => {
//     const moveScroll = new MoveScroll(wrapper, mockLength, {
//       loop: true,
//     });

//     moveScroll.prev();
//     wrapper.dispatchEvent(new Event("transitionend"));

//     expect(moveScroll.getCurrentIndex()).toBe(3);
//   });
// });
