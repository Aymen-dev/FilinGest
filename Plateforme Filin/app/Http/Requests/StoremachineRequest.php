<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;

class StoremachineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            '.reference'=>['required'],
            '.etat_machine'=>['required'],
            '.nom_machine'=>['required'],
            '.caract_numerique'=>['required'],
            '.modele'=>['required'],
            '.marque'=>['required'],
            '.departement'=>['required'],
            '.systeme'=>['required'],
            '.pds_vase'=>['required'],
        ];
    }
}
