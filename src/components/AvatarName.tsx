interface AvatarNameProps {
  name: string | undefined
  size: number
  colorSecondary?: boolean
}

const AvatarName = ({ name, size = 40, colorSecondary }: AvatarNameProps) => {
  const initial = name?.charAt(0).toUpperCase()

  const avatarStyle = {
    width: size,
    height: size,
    backgroundColor: colorSecondary ? `var(--bs-info)` : `var(--bs-secondary)`,
    color: 'inherit',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size / 2,
    cursor: 'pointer'
  }

  return <div style={{ ...avatarStyle }}>{initial}</div>
}

export default AvatarName
