import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {

    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {

    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {

    const response = await this._load({

      url: `tasks/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {

    const adaptedPoint = {...point,
      'date_from': new Date(point.dateFrom).toISOString(),
      'date_to': new Date(point.dateTo).toISOString(),
      'base_price': Number(point.basePrice),
      'offers': point.offersIDs

    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;

    delete adaptedPoint.basePrice;
    delete adaptedPoint.offersIDs;

    return adaptedPoint;
  }
}
