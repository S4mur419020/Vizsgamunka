<?php

namespace App\Policies;

use App\Models\Felhasznalo;
use App\Models\Role;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Felhasznalo $felhasznalo): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Felhasznalo $felhasznalo, Role $role): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Felhasznalo $felhasznalo): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Felhasznalo $felhasznalo, Role $role): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Felhasznalo $felhasznalo, Role $role): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Felhasznalo $felhasznalo, Role $role): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Felhasznalo $felhasznalo, Role $role): bool
    {
        return false;
    }
}
