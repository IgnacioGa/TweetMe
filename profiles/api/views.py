from django.utils.http import is_safe_url
from django.conf import settings

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from ..serializers import PublicProfileSerializar

from ..models import Profile

# Create your views here.
User = get_user_model()

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

""" @api_view(['GET']) 
@permission_classes([IsAuthenticated])
def user_profile_detail_view(request, username, *args, **kwargs):
    current_user = request.user
    to_follow_user = 
    return Response({}, status=200) """


@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        current_user = request.user
        action = data.get("action")
        if profile_obj.user != current_user:
            if action == "follow":
                profile_obj.followers.add(current_user)
            elif action == "unfollow":
                profile_obj.followers.remove(current_user)
            else:
                pass
    serializer = PublicProfileSerializar(
        instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)


""" @api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
    to_follow_user_qs = User.objects.filter(username=username)
    if current_user.username == username:
        my_followers = current_user.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)
    if not to_follow_user_qs.exists():
        return Response({}, status=404)
    other = to_follow_user_qs.first()
    profile = other.profile
    data = request.data or {}
    action = data.get("action")

    if action == "follow":
        profile.followers.add(current_user)
    elif action == "unfollow":
        profile.followers.remove(current_user)
    else:
        pass
    data = PublicProfileSerializar(
        instance=profile, context={"request": request})
    return Response(data.data, status=200) """
