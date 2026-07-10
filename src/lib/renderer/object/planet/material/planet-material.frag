uniform vec3 uSpecularLightValue;
uniform float uSpecularThreshold;
uniform float uShadeSteps;
uniform vec3 uGradientLightValue;
uniform vec3 uGradientDarkValue;
uniform vec3 uLightDirection;

varying vec3 vLocalNormal;

void main() {
    vec3 normal = normalize(vLocalNormal);
    vec3 lightDirection = normalize(uLightDirection);

    float light = dot(normal, lightDirection) * 0.5 + 0.5;
    float shade = smoothstep(0.2, 1.0, light);
    shade = floor(shade * (uShadeSteps - 1.0)) / (uShadeSteps - 1.0);

    vec3 color = mix(uGradientDarkValue, uGradientLightValue, shade);
    if (light > uSpecularThreshold) {
         color = mix(color, uSpecularLightValue, light);
    }

    gl_FragColor = vec4(color, 1.0);
}
