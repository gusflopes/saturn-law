import Profile from '../models/Profile';
import User from '../models/User';

class ProfileService {

  async createUserProfile(email, newProfile, social) {
    // return {success, profile, message, error}

    const user = await User.findOne({
      where: { email },
      include: [{ model: Profile, as: 'profiles' }],
    });
    // console.log(user.profiles);

    const profileExists = await user.profiles
      .map(e => {
        return e.social_media;
      })
      .indexOf(newProfile.social_media);
    console.log(profileExists);

    if (profileExists < 0) {
      // Ainda não existe o Profile, posso criar um novo!
      try {
        const currentProfile = await user.createProfile(newProfile);
        return {success: true, profile: currentProfile, message: 'New profile created', error: null}
      } catch (err) {
        return {success: false, profile: null, message: "You can't create an account with that Social media.", error: err}
      }
    }
    const profileList = await user.getProfiles();
    return {success: false, profile: profileList, message: 'Profile already exists. Try to login.', error: null}

  }

  async findUserProfile(email, social) {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: Profile,
            as: 'profiles',
            where: { social_media: social },
            attributes: ['id', 'social_media', 'social_id', 'email', 'name'],
          },
        ],
      });

      if (!user) {
        return {success: false, message: "User don't have a profile"}
      }

      return { success: true, user };
    } catch (err) {
      return { success: false, message: 'An error ocurred', err };
    }
  }
}

export default new ProfileService();
