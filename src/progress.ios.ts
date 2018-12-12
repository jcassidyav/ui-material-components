import { ProgressBase, progressColorProperty, progressBackgroundColorProperty } from "./progress-common"
import { themer } from "./material"
import { heightProperty, Color } from "tns-core-modules/ui/core/view"
import { screen } from "tns-core-modules/platform/platform";

export class Progress extends ProgressBase {
    nativeViewProtected: MDCProgressView

    constructor() {
        super();
        this.effectiveMinHeight = 2 * screen.mainScreen.scale;
    }

    public createNativeView() {
        const result = MDCProgressView.new()
        const colorScheme: MDCSemanticColorScheme = themer.getAppColorScheme()
        if (colorScheme) {
            MDCProgressViewColorThemer.applyColorSchemeToProgressView(
                colorScheme,
                result
            )
            //light color is not applied
            if (colorScheme.primaryColorVariant) {
                result.trackTintColor = colorScheme.primaryColorVariant;
            }
        }
        console.log("created MDCProgressView")
        return result
    }

    [heightProperty.getDefault](): number {
        console.log("heightProperty default")
        return 2
    }

    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.progressTintColor = color ? color.ios : null;
    }
    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.trackTintColor = color ? color.ios : null;
    }
}
