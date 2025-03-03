export class Medoc {
  constructor(id, denomination, formepharmaceutique, qte, photo) {
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._id = id;
    this._photo = photo;
    this._qte = qte;
  }
  // ---- getters
  get id() {
    return this._id;
  }
  get denomination() {
    return this._denomination;
  }
  get formepharmaceutique() {
    return this._formepharmaceutique;
  }
  get photo() {
    return this._photo;
  }
  get qte() {
    return this._qte;
  }
  // ---- setters
  // modifier la denomination
  set denomination(denomination) {
    this._denomination = denomination;
  }
  // modifier la formepharmaceutique
  set formepharmaceutique(formepharmaceutique) {
    this._formepharmaceutique = formepharmaceutique;
  }
  // modifier la photo
  set photo(photo) {
    this._photo = photo;
  }
  // modifier la denomination
  set qte(qte) {
    this._qte = qte;
  }
  // -- toString
  toString() {
    return `--> ${this.denomination}`;
  }
}
