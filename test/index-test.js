const React = require('react');
const { shallow } = require('enzyme');

const Translation = require('../components/Translation');
const Circle = require('../components/Circle');
const Animation = require('../components/Animation');
const Pusheen = require('../components/Pusheen');


describe('Translation', () => {
  it('translates the new greeting code when one gets passed in from the props', () => {
    const wrapper = shallow(<Translation />);
    wrapper.setProps({ greetingCode: 'morning' });
    expect(wrapper.state().greeting).toEqual('Good morning!');
  });

  it('does not translate the new greeting code if it is the same as the previous greeting code', () => {
    const spy = expect.spyOn(Translation.prototype, 'translate');
    const wrapper = shallow(<Translation />);
    wrapper.setProps({ greetingCode: 'morning' });
    wrapper.setProps({ greetingCode: 'morning' });
    expect(spy.calls.length).toEqual(1);
    Translation.prototype.translate.restore();
  });
});

describe('Circle', () => {
  it('does not re-render when the same color is passed in twice', () => {
    const spy = expect.spyOn(Circle.prototype, 'render').andCallThrough();
    const wrapper = shallow(<Circle color='red' />);
    wrapper.setProps({ color: 'red' });
    expect(spy.calls.length).toEqual(1);
  });
});

describe('Animation', () => {
  it('calls the function to resize the pusheen whenever the component re-renders', () => {
    const spy = expect.spyOn(Animation.prototype, 'showLoadingBar');
    const wrapper = shallow(<Animation />);
    wrapper.instance().componentWillUpdate();
    expect(spy.calls.length).toEqual(1);
  });
});

describe('Pusheen', () => {
  it('calls the function to resize the pusheen whenever the component re-renders', () => {
    const spy = expect.spyOn(Pusheen.prototype, 'resizePusheen');
    const wrapper = shallow(<Pusheen />);
    wrapper.instance().componentDidUpdate();
    expect(spy.calls.length).toEqual(1);
  });
});
