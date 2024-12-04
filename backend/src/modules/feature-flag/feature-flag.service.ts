import { Injectable } from '@nestjs/common';
import * as configcat from 'configcat-node';

@Injectable()
export class ConfigCatService {
	private readonly configCatClient;

	constructor() {
		const logger = configcat.createConsoleLogger(configcat.LogLevel.Error);
		this.configCatClient = configcat.getClient(
			'configcat-sdk-1/zefcCLxd8k6NX3XwgZtGyg/hgVI7Z2Ik0u_D6Ev5GKbSg',
			configcat.PollingMode.AutoPoll,
			{ logger: logger }
		);
	}

	public async getFeatureStatus(flagKey: string): Promise<boolean> {

		return this.configCatClient.getValueAsync(flagKey, false);
	}
}