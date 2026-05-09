import { Platform } from 'react-native';
import BoardWeb from './Board.web';
import BoardNative from './Board.native';

const Board = Platform.OS === 'web' ? BoardWeb : BoardNative;
export default Board;
