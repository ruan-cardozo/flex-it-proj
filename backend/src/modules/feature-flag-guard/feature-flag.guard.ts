import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigCatService } from '../feature-flag/feature-flag.service';

@Injectable()
export class FeatureFlagGuard implements CanActivate {

	constructor(private readonly configCatService: ConfigCatService) { }

	public async canActivate(): Promise<boolean> {

		const isEnabled = await this.configCatService.getFeatureStatus('canshowmileagefeature');

		return isEnabled;
	}
}
