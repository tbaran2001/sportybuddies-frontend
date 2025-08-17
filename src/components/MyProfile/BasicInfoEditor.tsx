import {useCallback, useMemo, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type {Profile} from '../../models/profile';
import {calculateAge} from '../../utils/profileUtils';

interface BasicInfoEditorProps {
    profile: Profile;
    saving?: boolean;
    onSave: (data: { name: string; gender: number; dateOfBirth: string }) => Promise<void> | void;
}

const Container = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
}));

const Header = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

const Actions = styled(Box)({
    display: 'flex',
    gap: 8,
});

const GENDER_OPTIONS = [
    {value: 0, label: 'Unknown'},
    {value: 1, label: 'Male'},
    {value: 2, label: 'Female'},
];

const pad = (n: number) => String(n).padStart(2, '0');

const toInputDate = (isoOrDateLike: string) => {
    // Expecting ISO string from API; fallback safe parse
    const d = new Date(isoOrDateLike);
    if (Number.isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    return `${yyyy}-${mm}-${dd}`;
};

const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 120);
    return toInputDate(today.toISOString());
};

const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return toInputDate(today.toISOString());
};

export const BasicInfoEditor = ({profile, saving, onSave}: BasicInfoEditorProps) => {
    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(profile.name ?? '');
    const [gender, setGender] = useState<number>(profile.gender ?? 0);
    const [dateOfBirth, setDateOfBirth] = useState<string>(toInputDate(profile.dateOfBirth) ?? '');

    const [errors, setErrors] = useState<{ name?: string; gender?: string; dateOfBirth?: string }>({});

    const initial = useMemo(() => ({
        name: profile.name ?? '',
        gender: profile.gender ?? 0,
        dateOfBirth: toInputDate(profile.dateOfBirth) ?? '',
    }), [profile]);

    const maxDate = useMemo(getMaxDate, []);
    const minDate = useMemo(getMinDate, []);

    const validate = useCallback(() => {
        const next: { name?: string; gender?: string; dateOfBirth?: string } = {};
        const trimmed = name.trim();
        if (!trimmed) {
            next.name = 'Name is required';
        } else if (trimmed.length < 2) {
            next.name = 'Name must be at least 2 characters';
        } else if (trimmed.length > 50) {
            next.name = 'Name must be at most 50 characters';
        }

        if (![0, 1, 2].includes(Number(gender))) {
            next.gender = 'Invalid gender';
        }

        if (!dateOfBirth) {
            next.dateOfBirth = 'Date of birth is required';
        } else {
            const age = calculateAge(dateOfBirth);
            if (age < 18) {
                next.dateOfBirth = 'You must be at least 18 years old';
            } else if (age > 120) {
                next.dateOfBirth = 'Please enter a valid date of birth';
            }
            const d = new Date(dateOfBirth);
            const now = new Date();
            if (d > now) {
                next.dateOfBirth = 'Date of birth cannot be in the future';
            }
        }

        setErrors(next);
        return next;
    }, [name, gender, dateOfBirth]);

    const hasChanges = useMemo(() => (
        initial.name !== name || initial.gender !== gender || initial.dateOfBirth !== dateOfBirth
    ), [initial, name, gender, dateOfBirth]);

    const handleEdit = () => {
        setEditing(true);
        setName(profile.name ?? '');
        setGender(profile.gender ?? 0);
        setDateOfBirth(toInputDate(profile.dateOfBirth) ?? '');
        setErrors({});
    };

    const handleCancel = () => {
        setEditing(false);
        setName(initial.name);
        setGender(initial.gender);
        setDateOfBirth(initial.dateOfBirth);
        setErrors({});
    };

    const handleSave = async () => {
        const v = validate();
        if (Object.keys(v).length > 0) return;

        const payload = {
            name: name.trim(),
            gender: Number(gender),
            dateOfBirth, // already in yyyy-MM-dd
        };

        await onSave(payload);
        setEditing(false);
    };

    return (
        <Container>
            <Header>
                <Typography variant="h6">Basic info</Typography>
                {!editing && (
                    <Button startIcon={<EditIcon/>} variant="text" onClick={handleEdit}>Edit</Button>
                )}
            </Header>

            {editing ? (
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={validate}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        inputProps={{maxLength: 50}}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            label="Gender"
                            value={String(gender)}
                            onChange={(e) => setGender(Number(e.target.value))}
                            onBlur={validate}
                        >
                            {GENDER_OPTIONS.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Date of birth"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        onBlur={validate}
                        error={Boolean(errors.dateOfBirth)}
                        helperText={errors.dateOfBirth}
                        slotProps={{htmlInput: {min: minDate, max: maxDate}}}
                        fullWidth
                    />

                    <Actions>
                        <Button variant="outlined" onClick={handleCancel} disabled={saving}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave} disabled={saving || !hasChanges}>Save</Button>
                    </Actions>
                </Stack>
            ) : (
                <Stack spacing={1}>
                    <Typography variant="body1">Name: {profile.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Gender: {GENDER_OPTIONS.find(g => g.value === profile.gender)?.label ?? 'Unknown'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date of birth: {toInputDate(profile.dateOfBirth)}
                    </Typography>
                </Stack>
            )}
        </Container>
    );
};

export default BasicInfoEditor;

