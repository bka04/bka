import './CrosswordClues.css';

const CrosswordClues = () => {
  return (
    <div className='clues'>
      <h4>Across</h4>
      <ul className='clueList'>
        <li>1. Respond.  Also a popular JavaScript framework</li>
        <li>6. Debate</li>
        <li>7. These are worth two points in cribbage</li>
        <li>8. Florida Keys, e.g.</li>
        <li>9. Home ownership documents</li>
      </ul>
      <h4>Down</h4>
      <ul className='clueList'>
        <li>1. With 5 down, same day COVID exams</li>
        <li>2. Remove</li>
        <li>3. Popular software development approach</li>
        <li>4. Honey ___ ham</li>
        <li>5. See 1 down</li>
      </ul>
    </div>
    
  );
}

export default CrosswordClues;