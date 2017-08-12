import knex from 'knex';
import bookshelf from 'bookshelf';
import knexfile from '../knexfile';

const _knex = knex(knexfile['development']);

export default bookshelf(_knex);