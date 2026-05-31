import post from './post';
import blogSection from './section';
import blockContent from './blockContent';
import { 
  exampleBlock, 
  highlightBlock, 
  simplificationBlock, 
  quoteBlock, 
  tableBlock 
} from './customBlocks';

export const schemaTypes = [
  // Primary schemas
  post,
  blockContent,
  
  // Legacy section schema (kept for backward compatibility)
  blogSection,
  
  // Legacy custom block types (kept for backward compatibility)
  exampleBlock,
  highlightBlock,
  simplificationBlock,
  quoteBlock,
  tableBlock
];
