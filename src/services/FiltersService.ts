import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Filters} from "../models/filters.model";

@Injectable()
export class FiltersService {

  filtersFromUser = new Filters();
  constructor() { }

  setFilters(filters) {
    this.filtersFromUser.maxDist = filters.maxDist;
    this.filtersFromUser.addictsType = filters.addictsType;
    this.filtersFromUser.female = filters.female;
    this.filtersFromUser.male = filters.male;
    this.filtersFromUser.ageRangeLower = filters.ageRangeLower;
    this.filtersFromUser.ageRangeUpper = filters.ageRangeUpper;
  }

  getFilters(): any{
    if(this.filtersFromUser == null){
      return null;
    }
    return this.filtersFromUser;
  }
}
