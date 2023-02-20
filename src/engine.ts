import { v1 as uuidv1 } from "uuid";

type AugRecord = Record<string, unknown>;
type Config = {
  fieldsToSearch: string[];
  fieldBoosts: { fieldName: string; boost: number }[];
};

interface SearchType {
  config: Config | null;
  db: {
    records: AugRecord[];
  };

  index<SearchRecord extends Record<string, unknown>>(
    records: SearchRecord[]
  ): void;
}

class Search implements SearchType {
  db: SearchType["db"] = {
    records: [],
  };

  config: Config | null;
  nGramSize = 2;

  constructor(config?: Config) {
    this.config = config ?? null;
  }

  private calculateDistance(query: string) {
    const queryNGrams = this.createNGrams(query);
    this.db.records.forEach((record) => {
      let querySet = new Set(queryNGrams);
      let hits = 0;
    });
  }

  private createNGrams(val: string): string[] {
    const nGramPadding = this.nGramSize - 1;
    const nGramPrefix = " ".repeat(nGramPadding);
    const nGramSuffix = " ".repeat(nGramPadding - 1);

    val = `${nGramPrefix}${val.toLowerCase()}${nGramSuffix}`;

    let ngrams = new Array(val.length - this.nGramSize + 1);

    for (let i = 0; i < ngrams.length; i++) {
      ngrams[i] = val.slice(i, i + this.nGramSize);
    }
    return ngrams;
  }

  index<SearchRecord extends Record<string, unknown>>(
    records: SearchRecord[],
    config?: Config
  ) {
    records.forEach((record) => {
      const augRecord: AugRecord = {
        ...record,
        _sssID: uuidv1(),
      };

      Object.keys(record).forEach((key) => {
        augRecord[`${key}_ngram`] = this.createNGrams(`${record[key]}`);
      });

      return this.db.records.push(augRecord);
    });

    console.log(JSON.stringify(this.db, null, 2));
  }
}

export default Search;
