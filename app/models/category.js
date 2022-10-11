import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { format, formatDistanceToNow } from 'date-fns';
import autoSerialize from '../utils/auto-serialize';

export default class CategoryModel extends Model {
    /** @ids */
    @attr('string') uuid;
    @attr('string') company_uuid;
    @attr('string') parent_uuid;
    @attr('string') owner_uuid;
    @attr('string') icon_file_uuid;

    /** @relationships */
    @belongsTo('file') icon_file;
    @tracked parent_category;

    /** @attributes */
    @attr('string') owner_type;
    @attr('string') name;
    @attr('string') description;
    @attr('raw') translations;
    @attr('string') icon;
    @attr('string') icon_color;
    @attr('string') icon_url;
    @attr('string') for;
    @attr('string') slug;
    @attr('string') order;

    /** @dates */
    @attr('date') deleted_at;
    @attr('date') created_at;
    @attr('date') updated_at;

    /** @methods */
    toJSON() {
        return autoSerialize(this);
    }

    /** @computed */
    @computed('public_id') get customerId() {
        return this.public_id.replace('contact_', 'customer_');
    }

    @computed('updated_at') get updatedAgo() {
        return formatDistanceToNow(this.updated_at);
    }

    @computed('updated_at') get updatedAt() {
        return format(this.updated_at, 'PPP p');
    }

    @computed('updated_at') get updatedAtShort() {
        return format(this.updated_at, 'PP');
    }

    @computed('created_at') get createdAgo() {
        return formatDistanceToNow(this.created_at);
    }

    @computed('created_at') get createdAt() {
        return format(this.created_at, 'PPP p');
    }

    @computed('created_at') get createdAtShort() {
        return format(this.created_at, 'PP');
    }
}
