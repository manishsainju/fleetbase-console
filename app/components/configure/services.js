import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ConfigureServicesComponent extends Component {
    @service fetch;
    @service notifications;
    @tracked isLoading = false;

    /** aws service */
    @tracked awsKey = null;
    @tracked awsSecret = null;
    @tracked awsRegion = null;

    /** ipinfo service */
    @tracked ipinfoApiKey = null;

    /** google maps service */
    @tracked googleMapsApiKey = null;
    @tracked googleMapsLocale = 'us';

    /** twilio service */
    @tracked twilioSid = null;
    @tracked twilioToken = null;
    @tracked twilioFrom = null;

    /**
     * Creates an instance of ConfigureServicesComponent.
     * @memberof ConfigureServicesComponent
     */
    constructor() {
        super(...arguments);
        this.loadConfigValues();
    }

    @action setConfigValues(config) {
        for (const key in config) {
            if (this[key] !== undefined) {
                this[key] = config[key];
            }
        }
    }

    @action loadConfigValues() {
        this.isLoading = true;

        this.fetch
            .get('settings/services-config')
            .then((response) => {
                this.setConfigValues(response);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action save() {
        this.isLoading = true;

        this.fetch
            .post('settings/services-config', {
                aws: {
                    key: this.awsKey,
                    secret: this.awsSecret,
                    region: this.awsRegion
                },
                ipinfo: {
                    api_key: this.ipinfoApiKey
                },
                googleMaps: {
                    api_key: this.googleMapsApiKey,
                    locale: this.googleMapsLocale
                },
                twilio: {
                    sid: this.twilioSid,
                    token: this.twilioToken,
                    from: this.twilioFrom
                }
            })
            .then((response) => {
                this.notifications.success('Services configuration saved.');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
