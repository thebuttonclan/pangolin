import storyBuilder from '../templates/ButtonTemplate';
import Button from '../../packages/component-library-gov/src/Button';

const exported = storyBuilder(Button, "Button")
const metaData = exported.default
export {metaData as default}
export const {Primary, Secondary, Large, Small} = exported