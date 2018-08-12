import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const clauses = [
      { id: 1,  orig: 'world',          origTr: 'world transcription',   transl: 'слово',
        translTr: 'произношение слова', origSound: '',                   translSound: ''},
      { id: 2,  orig: 'second world',     origTr: 'transcription ...',
        transl: 'первое слово',   translTr: 'произношение ...',
        origSound: '',            translSound: ''},
      { id: 3,  orig: 'cat',     origTr: 'transcription ...',
        transl: 'первое слово',   translTr: 'произношение ...',
        origSound: '',            translSound: ''},
      { id: 4,  orig: 'tree',     origTr: 'transcription ...',
        transl: 'первое слово',   translTr: 'произношение ...',
        origSound: '',            translSound: ''}
    ];
    return {clauses};
  }
}
