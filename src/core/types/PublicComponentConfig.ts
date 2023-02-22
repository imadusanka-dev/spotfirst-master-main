/**
 * Authentication configuration
 */
export interface PublicComponentConfig {
  public: boolean
}

/**
 * A component with authentication configuration
 */
export type PublicComponent<PropsType = any> = React.FC<PropsType> &
  PublicComponentConfig
