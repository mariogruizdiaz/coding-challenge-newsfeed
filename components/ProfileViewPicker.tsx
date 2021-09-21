import styled from 'styled-components'

type Props = {
    onViewProfileChange: any;
}

export default function ProfileViewPicker({ onViewProfileChange }: Props) {
    function handleChange(event: { target: { value: any } }) {
        onViewProfileChange(event.target.value)
    }

    return (
        <PickerContainer>
            <h2>Profile View</h2>
            <select name='option' onChange={handleChange}>
                <option value="N/A">N/A</option>
                <option value="writers">Writer View</option>
                <option value="founders">Founder View</option>
                <option value="angels">Angel View</option>
            </select>
        </PickerContainer>
    )
}

const PickerContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`
