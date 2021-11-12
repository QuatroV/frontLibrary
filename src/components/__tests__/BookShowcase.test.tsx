import renderer from "react-test-renderer";
import BookShowcase from "../BookShowcase";

test("test BookShowcase", () => {
  const component = renderer.create(<BookShowcase />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
