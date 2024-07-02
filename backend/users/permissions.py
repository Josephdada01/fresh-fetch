"""
Global permissions module
"""
from rest_framework.permissions import BasePermission


class IsVendor(BasePermission):
    """"
    Permission to check that the incoming request is from a 
    from a normal User account type
    """

    def has_permission(self, request, view):
        """
        verify the user has access. Returns True if the user is not a vendor.
        """

        return request.user.is_vendor
