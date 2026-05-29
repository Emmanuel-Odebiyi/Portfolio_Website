import post from './post';
import blogSection from './section';
import { 
  exampleBlock, 
  highlightBlock, 
  simplificationBlock, 
  quoteBlock, 
  tableBlock 
} from './customBlocks';

export const schemaTypes = [
  post,
  blogSection,
  exampleBlock,
  highlightBlock,
  simplificationBlock,
  quoteBlock,
  tableBlock
];
