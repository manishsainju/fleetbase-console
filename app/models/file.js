import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { format, formatDistanceToNow } from 'date-fns';
import ENV from '@fleetbase/console/config/environment';
import isVideoFile from '../utils/is-video-file';
import isImageFile from '../utils/is-image-file';
import autoSerialize from '../utils/auto-serialize';

export default class FileModel extends Model {
    /** @ids */
    @attr('string') uuid;
    @attr('string') uploader_uuid;
    @attr('string') company_uuid;
    @attr('string') key_uuid;

    /** @attributes */
    @attr('string') caption;
    @attr('string') s3url;
    @attr('string') path;
    @attr('string') bucket;
    @attr('string') folder;
    @attr('string') etag;
    @attr('string') original_filename;
    @attr('string') type;
    @attr('string') content_type;
    @attr('number') file_size;
    @attr('string') slug;
    @attr('string') permalink;

    /** @dates */
    @attr('date') deleted_at;
    @attr('date') created_at;
    @attr('date') updated_at;

    /** @computed */
    @computed('updated_at') get updatedAgo() {
        return formatDistanceToNow(this.updated_at);
    }

    @computed('updated_at') get updatedAt() {
        return format(this.updated_at, 'PPP');
    }

    @computed('created_at') get createdAgo() {
        return formatDistanceToNow(this.created_at);
    }

    @computed('created_at') get createdAt() {
        return format(this.created_at, 'PPP p');
    }

    @computed('content_type') get isVideo() {
        return isVideoFile(this.content_type);
    }

    @computed('content_type') get isImage() {
        return isImageFile(this.content_type);
    }

    @not('isVideo') isNotVideo;
    @not('isImage') isNotImage;

    /** @methods */
    toJSON() {
        return autoSerialize(this);
    }

    downloadFromApi() {
        window.open(ENV.api.host + '/' + ENV.api.namespace + '/files/download?file=' + this.id, '_self');
    }

    download() {
        const owner = getOwner(this);
        const fetch = owner.lookup(`service:store`);

        return fetch.download('files/download', { file: this.id });
    }
}
